import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {createPosts} from "../actions";

class PostsNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ""}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }
  onSubmit(values) {
    this.props.createPosts(values,()=>{
      this.props.history.push('/');
    });
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field name="title" label="Title" component={this.renderField} />
        <Field
          name="categories"
          label="Categories"
          component={this.renderField}
        />
        <Field name="content" label="Content" component={this.renderField} />
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <Link to ='/' className= "btn btn-danger">Cancel</Link>
      </form>
    );
  }
}
function validate(values) {
  const errors = {};
  if (!values.title || values.title.length < 3) {
    errors.title = "Enter the Title that is atleast 3 characters";
  }
  if (!values.categories) {
    errors.categories = "Cannot Be Empty!";
  }
  if (!values.content) {
    errors.content = "Cannot Be Empty!";
  }
  // If errors is empty the form is fine
  // If errors has an properties, redux form assumes form is invalid
  return errors;
}
export default reduxForm({
  validate,
  form: "PostsNewForm"
})(
  connect(null,{createPosts})(PostsNew)
);
