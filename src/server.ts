import app from './app';
import dotenv from 'dotenv';
dotenv.config();
const { ADDRESS } = process.env;

const PORT = process.env.PORT || 8000;

app.listen(PORT, (): void => {
    console.log(`Server running on http://${ADDRESS}:${PORT}`);
});
