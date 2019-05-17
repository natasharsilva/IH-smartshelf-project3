import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class Example extends React.Component {
  render() {
    return (
      <Form>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
      </FormGroup>
      <FormGroup>
        <Label for="exampleText">Description  </Label>
        <Input type="textarea" name="text" id="exampleText" />
      </FormGroup>
      {/* <FormGroup>
        <Label for="exampleFile">File</Label>
        <Input type="file" name="file" id="exampleFile" />
        <FormText color="muted">
          This is some placeholder block-level help text for the above input.
          It's a bit lighter and easily wraps to a new line.
        </FormText>
      </FormGroup> */}

      <Button>Submit</Button>
    </Form>
  );
}
componentDidMount() {
  

}
}