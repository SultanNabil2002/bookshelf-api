document.addEventListener("DOMContentLoaded", function() {
    const unfinishedBooksTable = document.getElementById('unfinished-books').getElementsByTagName('tbody')[0];
    const finishedBooksTable = document.getElementById('finished-books').getElementsByTagName('tbody')[0];
    const bookForm = document.getElementById('book-form');
    const clearDataButton = document.getElementById('clear-data-button');

    function createBookRow(book) {
        const newRow = document.createElement('tr');
        newRow.id = book.id.toString();

        const cellId = document.createElement('td');
        cellId.textContent = book.id.toString();
        newRow.appendChild(cellId);

        const cellTitle = document.createElement('td');
        cellTitle.textContent = book.title;
        newRow.appendChild(cellTitle);

        const cellAuthor = document.createElement('td');
        cellAuthor.textContent = book.author;
        newRow.appendChild(cellAuthor);

        const cellYear = document.createElement('td');
        cellYear.textContent = book.year.toString();
        newRow.appendChild(cellYear);

        const cellAction = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        deleteButton.onclick = function() {
            removeBook(book.id, book.isComplete);
        };
        cellAction.appendChild(deleteButton);

        const moveButton = document.createElement('button');
        moveButton.textContent = book.isComplete ? 'Kembalikan' : 'Selesaikan';
        moveButton.onclick = function() {
            if (book.isComplete) {
                returnBook(book.id);
            } else {
                moveBook(book.id);
            }
        };
        cellAction.appendChild(moveButton);

        newRow.appendChild(cellAction);

        return newRow;
    }

    function addBookToTable(book) {
        const table = book.isComplete ? finishedBooksTable : unfinishedBooksTable;
        const newRow = createBookRow(book);
        table.appendChild(newRow);
        updateLocalStorage();
    }

    function removeBook(id, isComplete) {
        const bookElement = document.getElementById(id);
        if (bookElement) {
            bookElement.parentNode.removeChild(bookElement);
            updateLocalStorage();
        }
    }

    function moveBook(id) {
        const sourceTable = document.getElementById('unfinished-books').getElementsByTagName('tbody')[0];
        const targetTable = document.getElementById('finished-books').getElementsByTagName('tbody')[0];

        const bookElement = document.getElementById(id);
        if (bookElement) {
            const bookData = {
                id: bookElement.cells[0].textContent,
                title: bookElement.cells[1].textContent,
                author: bookElement.cells[2].textContent,
                year: parseInt(bookElement.cells[3].textContent),
                isComplete: true
            };

            sourceTable.removeChild(bookElement);
            addBookToTable(bookData);
        }
    }

    function returnBook(id) {
        const sourceTable = document.getElementById('finished-books').getElementsByTagName('tbody')[0];
        const targetTable = document.getElementById('unfinished-books').getElementsByTagName('tbody')[0];

        const bookElement = document.getElementById(id);
        if (bookElement) {
            const bookData = {
                id: bookElement.cells[0].textContent,
                title: bookElement.cells[1].textContent,
                author: bookElement.cells[2].textContent,
                year: parseInt(bookElement.cells[3].textContent),
                isComplete: false
            };

            sourceTable.removeChild(bookElement);
            addBookToTable(bookData);
        }
    }

    function updateLocalStorage() {
        const unfinishedBooks = Array.from(unfinishedBooksTable.children).map(row => ({
            id: row.cells[0].textContent,
            title: row.cells[1].textContent,
            author: row.cells[2].textContent,
            year: parseInt(row.cells[3].textContent),
            isComplete: false
        }));
        const finishedBooks = Array.from(finishedBooksTable.children).map(row => ({
            id: row.cells[0].textContent,
            title: row.cells[1].textContent,
            author: row.cells[2].textContent,
            year: parseInt(row.cells[3].textContent),
            isComplete: true
        }));

        localStorage.setItem('unfinishedBooks', JSON.stringify(unfinishedBooks));
        localStorage.setItem('finishedBooks', JSON.stringify(finishedBooks));
    }

    function clearAllData() {
        localStorage.removeItem('unfinishedBooks');
        localStorage.removeItem('finishedBooks');
        unfinishedBooksTable.innerHTML = '';
        finishedBooksTable.innerHTML = '';
    }

    function loadBooksFromLocalStorage() {
        const unfinishedBooks = JSON.parse(localStorage.getItem('unfinishedBooks'));
        const finishedBooks = JSON.parse(localStorage.getItem('finishedBooks'));

        if (unfinishedBooks) {
            unfinishedBooks.forEach(book => {
                addBookToTable(book);
            });
        }
        if (finishedBooks) {
            finishedBooks.forEach(book => {
                addBookToTable(book);
            });
        }
    }

    function initializeApp() {
        clearDataButton.addEventListener('click', function() {
            if (confirm('Apakah Anda yakin ingin menghapus semua data buku?')) {
                clearAllData();
            }
        });

        bookForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const title = document.getElementById('title').value;
            const author = document.getElementById('author').value;
            const year = document.getElementById('year').value;
            const isComplete = document.getElementById('isComplete').checked;

            const bookId = new Date().getTime().toString();
            const book = {
                id: bookId,
                title: title,
                author: author,
                year: parseInt(year),
                isComplete: isComplete
            };

            addBookToTable(book);

            bookForm.reset();
        });

        loadBooksFromLocalStorage();
    }

    initializeApp();
});
