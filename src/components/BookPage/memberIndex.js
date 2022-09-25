import React, { useState, useEffect } from 'react';

/* import NextUI component */
import { Table } from '@nextui-org/react';

/* import service */
import { getBooks } from '../../api/bookAPI';

const BookPage = () => {
  const [book, setBook] = useState([]);

  const getBooksData = async () => {
    const books = await getBooks();
    setBook(books);
  };

  useEffect(() => {
    getBooksData();
  }, []);

  return (
    <div>
      <Table
        css={{
          height: 'auto',
          minWidth: '100%',
          backgroundColor: '#ffffff',
        }}
      >
        <Table.Header>
          <Table.Column>TITLE</Table.Column>
          <Table.Column>CATEGORY</Table.Column>
          <Table.Column>AUTHOR</Table.Column>
          <Table.Column>PUBLISHER</Table.Column>
          <Table.Column>LANGUAGE</Table.Column>
          <Table.Column>NUMBER OF PAGES</Table.Column>
          <Table.Column>NUMBER OF COPIES</Table.Column>
        </Table.Header>
        <Table.Body>
          {book.data &&
            book.data.map((row) => (
              <Table.Row key={row._id}>
                <Table.Cell>{row.title}</Table.Cell>
                <Table.Cell>{row.categoryId.name}</Table.Cell>
                <Table.Cell>
                  {row.authorId.firstName} {row.authorId.lastName}
                </Table.Cell>
                <Table.Cell>{row.publisherId.name}</Table.Cell>
                <Table.Cell>{row.language}</Table.Cell>
                <Table.Cell>{row.numberOfPages}</Table.Cell>
                <Table.Cell>{row.numberOfCopies}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default BookPage;
