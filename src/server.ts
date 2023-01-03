import app from './app';
import {config} from 'dotenv';
config();
const { ADDRESS, PORT } = process.env; 

const SERVICEPORT: number = PORT as unknown as number || 8000;

app.listen(PORT, (): void => {
    console.log(`Server running on http://${ADDRESS}:${SERVICEPORT}`);
});
