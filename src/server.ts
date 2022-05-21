import app from './app';
import dotenv from 'dotenv';
dotenv.config();
const { PORT, ADDRESS } = process.env;

app.listen(PORT, () => {
    console.log(`Server running on http://${ADDRESS}:${PORT}`);
});
