const KEY = 'srs.students.v1';
let students = [], editId = null;

const form = document.getElementById('studentForm');
const nameEl = document.getElementById('studentName');
const idEl = document.getElementById('studentId');
const emailEl = document.getElementById('email');
const contactEl = document.getElementById('contact');
const rowsEl = document.getElementById('rows');
const countEl = document.getElementById('count');
const searchEl = document.getElementById('search');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const formHint = document.getElementById('formHint');

const errorName = document.getElementById('errorName');
const errorId = document.getElementById('errorId');
const errorEmail = document.getElementById('errorEmail');
const errorContact = document.getElementById('errorContact');

// Regex: allow letters, spaces, hyphen, apostrophe
const onlyLetters = /^[A-Za-z\s'-]+$/;
const onlyNumbers = /^\d+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const minContactLen = 10;

function save(){ localStorage.setItem(KEY, JSON.stringify(students)); }
function load(){ const raw = localStorage.getItem(KEY); students = raw ? JSON.parse(raw) : []; }
function clearErrors(){ errorName.textContent=''; errorId.textContent=''; errorEmail.textContent=''; errorContact.textContent=''; formHint.textContent=''; }
function setHint(msg){ formHint.textContent = msg; }

function validate({name,id,email,contact}){
  clearErrors();
  let ok=true;
  if(!name || !onlyLetters.test(name.trim())){ errorName.textContent='Name must contain letters, spaces, - or \''; ok=false; }
  if(!id || !onlyNumbers.test(id.trim())){ errorId.textContent='Student ID must be numeric only.'; ok=false; }
  if(!email || !emailRegex.test(email.trim())){ errorEmail.textContent='Please enter a valid email address.'; ok=false; }
  if(!contact || !onlyNumbers.test(contact.trim()) || contact.trim().length<minContactLen){ errorContact.textContent='Contact must be numeric and at least 10 digits.'; ok=false; }
  return ok;
}

function render(filter=''){
  rowsEl.innerHTML='';
  const q=filter.trim().toLowerCase();
  const data=students.filter(s=>!q || s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || s.email.toLowerCase().includes(q));
  countEl.textContent=students.length;
  data.forEach(s=>{
    const row=document.createElement('div'); row.className='row';
    row.innerHTML=`
      <div><span class="pill">${s.name}</span></div>
      <div>${s.id}</div>
      <div class="muted">${s.email}</div>
      <div>${s.contact}</div>
      <div class="cell-actions">
        <button type="button" onclick="onEdit('${s.id}')">Edit</button>
        <button type="button" class="danger" onclick="onDelete('${s.id}')">Delete</button>
      </div>`;
    rowsEl.appendChild(row);
  });
  rowsEl.classList.toggle('has-scroll', rowsEl.scrollHeight>rowsEl.clientHeight);
}

window.onEdit=function(id){
  const s=students.find(x=>x.id===id); if(!s) return;
  editId=id;
  nameEl.value=s.name; idEl.value=s.id; emailEl.value=s.email; contactEl.value=s.contact;
  idEl.disabled=true; submitBtn.textContent='Update Record'; setHint('Editing record #'+id+'. Make changes and click Update.'); nameEl.focus();
}

window.onDelete=function(id){
  if(!confirm('Delete record #'+id+'?')) return;
  students=students.filter(x=>x.id!==id); save(); render(searchEl.value); setHint('Record #'+id+' deleted.');
  if(editId===id) resetForm();
}

function resetForm(){
  editId=null; form.reset(); idEl.disabled=false; clearErrors(); submitBtn.textContent='Save Record'; setHint('Form reset.');
}

form.addEventListener('submit', e=>{
  e.preventDefault();
  const payload={name:nameEl.value,id:idEl.value,email:emailEl.value,contact:contactEl.value};
  if(!validate(payload)){ setHint('Please fix validation errors.'); return; }
  if(editId){
    const idx=students.findIndex(x=>x.id===editId);
    if(idx!==-1){ students[idx]=payload; save(); render(searchEl.value); setHint('Record #'+payload.id+' updated successfully.'); }
    resetForm();
  } else {
    if(students.some(x=>x.id===payload.id)){ errorId.textContent='This Student ID already exists.'; setHint('Choose a unique Student ID.'); return; }
    students.push(payload); save(); render(searchEl.value); setHint('Record #'+payload.id+' added successfully.'); resetForm();
  }
});

resetBtn.addEventListener('click', resetForm);
clearAllBtn.addEventListener('click', ()=>{
  if(!confirm('Clear all records?')) return; students=[]; save(); render(searchEl.value); resetForm(); setHint('All records cleared.');
});
searchEl.addEventListener('input', ()=>render(searchEl.value));
load(); render();

function restrictToDigits(evt){ const allowed=['Backspace','Delete','ArrowLeft','ArrowRight','Tab']; if(allowed.includes(evt.key)) return; if(!/\d/.test(evt.key)) evt.preventDefault(); }
idEl.addEventListener('keydown', restrictToDigits);
contactEl.addEventListener('keydown', restrictToDigits);