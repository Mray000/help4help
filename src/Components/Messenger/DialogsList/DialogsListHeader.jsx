import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";

const DialogsListHeader = ({ FilterDialogs }) => {
  let mobile = false;
  return (
    <Formik
      onSubmit={(e) => FilterDialogs(e.dialogs_filter_s.toLowerCase())}
      initialValues={Object}
    >
      {({ handleSubmit, handleChange }) => (
        <Form
          onSubmit={handleSubmit}
          onChange={handleSubmit}
          className={`search_dialogs_in_${mobile ? "mobile_" : ""}group`}
        >
          <Form.Group>
            <InputGroup.Prepend>
              <InputGroup.Text className="search_prepend_in">
                <FontAwesomeIcon
                  icon={faSearch}
                  color="white"
                  size={mobile ? `3x` : null}
                />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              name="dialogs_filter_s"
              onChange={handleChange}
              placeholder="Search"
              type="text"
              autoComplete="off"
            />
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
};

export default DialogsListHeader;
