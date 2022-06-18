import app from './app';
import dotenv from 'dotenv';
dotenv.config();

const { PORT, ADDRESS } = process.env;
const port = PORT || 3000;

app.listen(port, (): void => {
    console.log(`Server running on http://${ADDRESS}:${port}`);
});
