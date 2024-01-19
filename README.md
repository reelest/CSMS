# CSMS

Comprehensive School Management System - by Enabulele Festus

## Project Structure

- assets/
- components/
- logic/
- models/
- pages/
- shared/
  |- components
  |- logic
  |- models
  |- utils

A bad choice in the beginning meant there is no src folder.

# Database

We make use of models which are basically Javascript files that can contain schema information.

The models are built to work with Firebase. This means advanced queries usually don't work.
However, you can make use of the airstore backend for faster advanced queries like is done in CSMS.

For developer peace of mind, such features are silently ignored when using Firebase.
