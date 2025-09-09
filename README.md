# Student Registration System

A **responsive web application** to **register, edit, view, and delete student records**. Includes **form validation, persistent storage**, and a clean **modern UI** with scrollable lists, badges, and pills. Built with **HTML, CSS, and vanilla JavaScript**.

---

## Features

- **Add / Edit / Delete Students**
  - Add students with **Name, Student ID, Email, and Contact Number**
  - Edit existing records
  - Delete individual records or clear all

- **Validation**
  - Name: letters and spaces only
  - Student ID: numeric only, must be unique
  - Email: valid format
  - Contact: numeric, minimum 10 digits

- **Persistent Storage**
  - Stores student records in `localStorage` (`srs.students.v1`)
  - Data persists across page reloads

- **Search**
  - Live search by **name, ID, or email**
  - Case-insensitive filtering

- **Responsive Design**
  - Works on **mobile, tablet, and desktop**
  - Scrollable student list when content exceeds visible area

- **UI Enhancements**
  - Gradient theme with badges and pills
  - Accessible form hints and keyboard restrictions for numeric fields
  - Smooth scrollbar for long lists

---

## Usage

1. **Open `index.html`** in a web browser.
2. **Fill out the form** with student details.
3. Click **Save Record** to add the student.
4. Use **Edit** or **Delete** buttons in the student list to manage records.
5. **Search** for students using the search bar.
6. **Clear All** to remove all records from storage.

---

## Technologies Used

- HTML5
- CSS3 (with variables and responsive layout)
- Vanilla JavaScript (ES6+)
- LocalStorage API for persistence

---

## Notes

- Ensure **unique Student IDs** when adding new records.
- The form automatically resets after adding or updating a student.
- Validation errors are displayed inline below each input field.

---

## License

This project is **open-source** and free to use under the [MIT License](LICENSE).

---

## Author

- Pritish Tripathy
