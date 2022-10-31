import React, { useState, useEffect } from 'react';

import { useForm, Controller } from 'react-hook-form';
import ReactSelect from 'react-select';

import { getPublishers } from '../../../api/publisherAPI';
import { getAuthors } from '../../../api/authorAPI';
import { getCategories } from '../../../api/categoryAPI';
import { Modal, Button, Text, Input } from '@nextui-org/react';

import { updateBook } from '../../../api/bookAPI';

const UpdatePopup = ({ visible, closeModal, bookDetails, onCreate }) => {
  const [publishers, setPublishers] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const { control, handleSubmit } = useForm();

  const fetchPublisherData = async () => {
    const response = await getPublishers();
    const result = response.data.map((item) => ({
      value: item._id,
      label: item.name,
    }));

    setPublishers(result);
  };

  const fetchAuthors = async () => {
    const response = await getAuthors();
    const result = response.data.map((item) => ({
      value: item._id,
      label: item.firstName + ' ' + item.lastName,
    }));

    setAuthors(result);
  };

  const fetchCategories = async () => {
    const response = await getCategories();
    const result = response.data.map((item) => ({
      value: item._id,
      label: item.name,
    }));

    setCategories(result);
  };

  useEffect(() => {
    fetchPublisherData();
    fetchAuthors();
    fetchCategories();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await updateBook(
        bookDetails.id,
        data.title,
        data.categoryId.value,
        data.authorId.value,
        data.publisherId.value,
        data.language.value,
        data.numberOfPages,
        data.numberOfCopies
      );
      onCreate();
      closeModal(false);
      return response;
    } catch (error) {
      console.log('🚀 ~ file: index.js ~ line 75 ~ onSubmit ~ error', error);
    }
  };

  return (
    <Modal preventClose aria-labelledby="modal-title" open={visible}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <Text id="modal-title" b size={18}>
            Update Book
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text h6>Title:</Text>
          <Controller
            render={({ field }) => (
              <Input
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder={bookDetails.title}
                {...field}
              />
            )}
            name="title"
            control={control}
            defaultValue=""
          />

          <Text h6>Category:</Text>
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <ReactSelect
                isClearable
                {...field}
                placeholder={bookDetails.categoryId.name}
                options={categories}
              />
            )}
          />

          <Text h6>Select author:</Text>
          <Controller
            name="authorId"
            control={control}
            render={({ field }) => (
              <ReactSelect
                isClearable
                {...field}
                placeholder={
                  bookDetails.authorId.firstName +
                  ' ' +
                  bookDetails.authorId.lastName
                }
                options={authors}
              />
            )}
          />

          <Text h6>Publisher:</Text>
          <Controller
            name="publisherId"
            control={control}
            render={({ field }) => (
              <ReactSelect
                isClearable
                {...field}
                placeholder={bookDetails.publisherId.name}
                options={publishers}
              />
            )}
          />

          <Text h6>Language:</Text>
          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <ReactSelect
                isClearable
                {...field}
                placeholder={bookDetails.language}
                options={[
                  { value: 'Vietnamese', label: 'Vietnamese' },
                  { value: 'English', label: 'English' },
                ]}
              />
            )}
          />

          <Text h6>Number of Pages:</Text>
          <Controller
            render={({ field }) => (
              <Input
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                type="number"
                placeholder={bookDetails.numberOfPages}
                {...field}
              />
            )}
            name="numberOfPages"
            control={control}
            defaultValue=""
          />

          <Text h6>Number of Copies:</Text>
          <Controller
            render={({ field }) => (
              <Input
                clearable
                bordered
                fullWidth
                color="primary"
                type="number"
                size="lg"
                placeholder={bookDetails.numberOfCopies}
                {...field}
              />
            )}
            name="numberOfCopies"
            control={control}
            defaultValue=""
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={() => closeModal(false)}>
            Close
          </Button>
          <Button auto type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default UpdatePopup;