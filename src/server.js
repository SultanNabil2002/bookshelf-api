import express from 'express';
import { nanoid } from 'nanoid';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 9000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

let books = [];

// Endpoint untuk menambah buku
app.post('/books', (req, res) => {
    const { title, author, year, isComplete, pageCount, readPage } = req.body;

    if (!title) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        });
    }

    if (readPage > pageCount) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        });
    }

    const id = nanoid();
    const book = {
        id,
        title,
        author,
        year,
        isComplete,
        pageCount,
        readPage,
        finished: pageCount === readPage,
        insertedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    books.push(book);

    res.status(201).json({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
            bookId: id
        }
    });
});

// Endpoint untuk mendapatkan semua buku
app.get('/books', (req, res) => {
    res.json({
        status: 'success',
        data: {
            books
        }
    });
});

// Endpoint untuk mendapatkan detail buku berdasarkan ID
app.get('/books/:bookId', (req, res) => {
    const { bookId } = req.params;
    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({
            status: 'fail',
            message: 'Buku tidak ditemukan'
        });
    }

    res.json({
        status: 'success',
        data: {
            book
        }
    });
});

// Endpoint untuk memperbarui buku
app.put('/books/:bookId', (req, res) => {
    const { bookId } = req.params;
    const { title, author, year, isComplete } = req.body;

    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan'
        });
    }

    if (!title) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        });
    }

    books[bookIndex] = {
        ...books[bookIndex],
        title,
        author,
        year,
        isComplete,
        updatedAt: new Date().toISOString()
    };

    res.json({
        status: 'success',
        message: 'Buku berhasil diperbarui'
    });
});

// Endpoint untuk menghapus buku
app.delete('/books/:bookId', (req, res) => {
    const { bookId } = req.params;

    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan'
        });
    }

    books.splice(bookIndex, 1);

    res.json({
        status: 'success',
        message: 'Buku berhasil dihapus'
    });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
