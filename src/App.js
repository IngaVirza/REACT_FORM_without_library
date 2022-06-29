import { useState, useEffect} from "react";
import './css/App.css';

function App() {
  const initialValues = { username: "", email: "", phone: "", date: "", message: ""};
  const [edit, setEdit] = useState(false)
  const [nameErr, setNameErr] = useState('')
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [phone, setPhone] = useState(['+', '7', ' ', '(']);
  const [phoneErr, setPhoneErr] = useState(false);

  // Form
  const handleChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setFormValues({...formValues, [name]: value });
    console.log({...formValues, [name]: value });
  };


  // Username input

  const handleChangeName = (e) => {
    const { name, value } = e.target;
    e.target.value = e.target.value.toUpperCase();
    setFormValues({...formValues, [name]: value });


    if (e.target.value.length < 3 
      ||(e.target.value.includes(' ') && e.target.value.slice( 0, e.target.value.indexOf(' ')).length < 3)) {
      setEdit(true)
    }
    else if (e.target.value.length >= 30 && !e.target.value.includes(' ')) {
      e.currentTarget.classList.add(' ')
      setEdit(true)
      setNameErr("Максимальная длина имени 30 символов!")
    }

    else if (e.target.value.indexOf(' ') > 0
      && e.target.value.slice(e.target.value.indexOf(' ') + 1, e.target.value.length + 1).length < 3) {
      e.currentTarget.classList.add(' ')
      setEdit(true)
      setNameErr("Длина фамилии минимум 3 символа!")
    }
    else if (e.target.value.indexOf(' ') > 0
      && e.target.value.slice(e.target.value.indexOf(' ') + 1, e.target.value.length + 1).length >= 30) {
      e.currentTarget.classList.add(' ')
      setEdit(true)
      setNameErr("Максимальная длина фамилии 30 символов!")
    }
  }

  // Phone input

  const phoneMask = (e) => {
    if (phone.length === 0) {
      setPhone(['+', '7', ' ', '('])
      setPhoneErr(false)
    }
  }

  const handleChangePhone = (e) => {

    const { name, value } = e.target;
    setFormValues({...formValues, [name]: value });

    
    
    let regexPhone = /[^0-9 \-)(+]/

    if (e.target.value.length <phone.length) {
      phone.pop()
      setPhone([...phone])
    }
    else if (e.target.value.length === 3 && phone[0] === '+') {
      setPhone([...phone, ' ', '(', e.target.value.slice(-1)])
    }
    else if (e.target.value.length === 4 && phone[0] === '+') {
      setPhone([...phone, '(', e.target.value.slice(-1)])
    }
    else if (e.target.value.length === 7 && phone[0] === '+') {
      setPhone([...phone, e.target.value.slice(-1), ')', ' '])
    }
    else if (e.target.value.length === 8 && phone[0] === '+') {
      setPhone([...phone, ')', ' ', e.target.value.slice(-1)])
    }
    else if (e.target.value.length === 12) {
      setPhone([...phone, e.target.value.slice(-1), '-'])
    }
    else if (e.target.value.length === 13 && phone[0] === '+') {
      setPhone([...phone, '-', e.target.value.slice(-1)])
    }
    else if (e.target.value.length === 15) {
      setPhone([...phone, e.target.value.slice(-1), '-'])
    }
    else if (e.target.value.length === 16 && phone[0] === '+') {
      setPhone([...phone, '-', e.target.value.slice(-1)])
    }
    else if (phone[0] !== '+' && e.target.value.length === 10) {
      setPhoneErr(false)
      setPhone(['+', '7', ' ', '(', e.target.value.charAt(0), e.target.value.charAt(1), e.target.value.charAt(2),
        ')', ' ', e.target.value.charAt(3), e.target.value.charAt(4), e.target.value.charAt(5), '-',
        e.target.value.charAt(6), e.target.value.charAt(7), '-', e.target.value.charAt(8), e.target.value.charAt(9)])
    }
    else if (phone[0] === '+' && e.target.value.length === 18) {
      setPhoneErr(false)
      setPhone([...phone, e.target.value.slice(-1)])
    }

    else if (!regexPhone.test(e.target.value)) {
      setPhone([...phone, e.target.value.slice(-1)])
    }

    e.target.value = e.target.value.replace(regexPhone, '')

    if (phone[0] !== '+' && e.target.value.length < 10) {
      setPhoneErr(true)
    }
  
  }

  useEffect(() => {
    if(Object.keys(formErrors).length === 0 && isSubmit){
    }
  },[formErrors])

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
   

   if (!values.email) {
    errors.email = "Введите Email!";
   } else if (!regex.test(values.email)){
    errors.email = "Неверный Email";
   }
    if (!values.phone) {
    errors.phone = "Введите телфон!";
   } else if (values.phone.length < 18) {
    errors.phone = "Телефон должен состоять из 10 цифр"
   }

   if (!values.date) {
    errors.date = "Дата не выбрана";
   }
   if (!values.message) {
    errors.message = "Введите сообщение!";
   } else if (values.message.length < 10 || values.message.length > 300) {
    errors.message = "Минимальная длина- 10 символов, максимальная- 300"
   }

   return errors; 
  
  };

  return (
    <div className='container'>
      {Object.keys(formErrors).length === 0 && isSubmit ? (<div>Форма успешно отправлена</div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
       )}
      <form onSubmit={handleSubmit}>
        <h1>Форма обратной связи</h1>
        <div>
        <label>Имя Фамилия</label><br/>
        <input
        type="text" 
        name="username" 
        required pattern="[A-Z]{3,}\s[A-Z]{3,}"
        value={formValues.username}
        onChange={handleChangeName}/>
        <div className="nameinput"> <br/>
        Поле может состоять только из 2-х слов в верхнем регистре (имя и фамилия) латинского алфавита.<br/>
        Минимальная длина каждого слова 3 символа, максимальная 30.<br/>
        Между словами может быть только 1 пробел. <br/>
        </div>
        <p>{edit} {nameErr}</p>
        </div>

        <div>
        <label>E-mail</label>
        <br/>
        <input 
        type="email" 
        name="email" 
        plceholder="Email" 
        value={formValues.email}
        onChange={handleChange}/>
        <p>{formErrors.email}</p>
        </div>

        <div>
        <label>Номер телефона</label>
        <br/>
        <input 
        name="phone"
        maxLength={18}
        value={phone.join('')}
        autoComplete='off'
        type="phone"
        onChange={handleChangePhone}
        onClick={phoneMask}
      />
      {phoneErr}
      <p>{formErrors.phone}</p>
      </div>

        <div >
        <label>Дата рождения</label>
        <br/>
        <input 
        type="date" 
        name="date" 
        plceholder="date" 
        value={formValues.date}
        onChange={handleChange}
        />
        <p>{formErrors.date}</p>
        </div>

        <div>
        <label>Сообщение</label>
        <br/>
        <textarea 
        type="text" 
        name="message" 
        plceholder="message" 
        value={formValues.message}
        onChange={handleChange}
        />
        <p>{formErrors.message}</p>
        </div>

        <button>Отправить</button>
      </form>
    </div>
  );
}   

export default App;
