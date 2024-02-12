import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/react';

// @ts-ignore
export const MySubmitButton = ({ value, isSubmitting, onSubmit }) => {
    return (
        <Button
            type="submit"
            disabled={isSubmitting}
            bg="brand.200"
            textColor="white"
            _hover={{ bg: "white", textColor: "brand.200" }}
            marginTop={10}
            name="action"
            value={value}
            onClick={onSubmit}
        >
            {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
    );
};

MySubmitButton.propTypes = {
    value: PropTypes.string.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
};