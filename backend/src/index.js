import cors from 'cors'; // Updated to ES Module import
import express from 'express';
import multer from 'multer';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import dotenv from 'dotenv';
dotenv.config()


const API_KEY = process.env.KEY;
// console.log('value of key : '+ API_KEY)
const genAI = new GoogleGenerativeAI(API_KEY);
const fileManager = new GoogleAIFileManager(API_KEY);

const app = express();
app.use(cors());
const upload = multer({ dest: 'uploads/' }); // Temporary storage for uploaded files

app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;

    // Upload file to Google Gemini
    const uploadResponse = await fileManager.uploadFile(file.path, {
      mimeType: file.mimetype,
      displayName: file.originalname,
    });

    console.log(`Uploaded file: ${uploadResponse.file.displayName}`);
    console.log(`File URI: ${uploadResponse.file.uri}`);

    // Generate content
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt =
      'Extract data from this invoice and organize it into three tables: ' +
      'Invoices (columns: Serial Number, Customer Name, Product Name, Quantity, Tax, Total Amount, Date), ' +
      'Products (columns: Name, Quantity, Unit Price, Tax, Price with Tax), ' +
      'and Customers (columns: Customer Name, Phone Number, Total Purchase Amount). Return the data in JSON format.';

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri,
        },
      },
      { text: prompt },
    ]);

    const rawResponse = result.response.text();
    console.log("Raw response from Gemini:", rawResponse);

    // Sanitize the response text (remove any invalid characters or markdown)

    const sanitizedText = rawResponse.replace(/^```json\n|\n```$/g, '').trim();

    const parsedData = JSON.parse(sanitizedText);

  // Normalize keys to lowercase
  const extractedData = {
    invoices: parsedData.Invoices || [],
    products: parsedData.Products || [],
    customers: parsedData.Customers || [],
  };

  console.log('Extracted Data:', extractedData);

  // Prepare response data
  const responseData = {
    invoices: extractedData.invoices,
    products: extractedData.products,
    customers: extractedData.customers,
  };

  console.log('Final Response Data:', responseData);
  res.json(responseData);
} catch (error) {
  console.error('Error handling file upload:', error.message);
  res.status(500).json({ error: error.message });
}
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
