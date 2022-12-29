import ebookController from '../controllers/ebook.controller';
import { Router } from 'express';

const ebook = Router();

ebook.post('/:book_id', ebookController.create);//done
ebook.get('/', ebookController.index);//done  
ebook.get('/:book_id', ebookController.getEbookByBookID);//done 
ebook.delete('/:book_id', ebookController.destroy);//done

export default ebook;