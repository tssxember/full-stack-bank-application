function Login(props){
    const [show, setShow]     = React.useState(true);
    const [status, setStatus] = React.useState('');

    
    let newFunction = props.handleClick;
      
    return (
      <>
      <Card
        bgcolor="secondary"
        header="Login"
        status={status}
        body={show ? 
          <CreateLoginForm setShow={setShow} setStatus={setStatus} handleClick={newFunction}/> : 
          <CreateLoginMsg setShow={setShow}/>}
      />
      
      </> 
      
      
    )
  }
  
  function CreateLoginMsg(props){
    const ctx = React.useContext(UserContext);
    let name = ctx.users[0].name;
    let balance = ctx.users[0].balance;
    
    return(<>
      <h5>Success</h5>
      <p>Welcome back {name}! Your current balance is ${balance}</p>
      
    </>);
  }
  
  function CreateLoginForm(props){    
    const [email, setEmail]       = React.useState('');
    const [password, setPassword] = React.useState('');
    const ctx = React.useContext(UserContext);

    function validate(field, label){
      if (!field) {
        props.setStatus('Error: ' + label);
        setTimeout(() => props.setStatus(''),3000);
        return false;
      }      
      return true;
    } 
  
    function handle(){

      if (!validate(email,    'Enter email'))    return;
      if (!validate(password, 'Enter password')) return;
      
      const url = `/findone/${email}`;
      let passCheck = 0;
      (async () => {
        //find current balance
        let resFind = await fetch(url);        
        let dataFind = await resFind.json();  
        let userPassword = dataFind.password;
        let userName = dataFind.name;
        let userBalance = dataFind.balance; 

        //check if password matches db
        if (userPassword == password){
          passCheck = 1;
          console.log(`verified ${email} ${userName} ${userBalance}`);
          ctx.users[0].email = email;
          ctx.users[0].name = userName;
          ctx.users[0].balance = userBalance;
          ctx.users[0].password = password;
          ctx.users[0].login = 1;

          props.handleClick()
                    
          console.log(ctx.users[0]);
          props.setShow(false);
          
        } else {
          props.setStatus('Error: Incorrect password');
          setTimeout(() => props.setStatus(''),3000);         
          props.setShow(true);
        }

      })();      
      
    }    
  
    return (<>
  
      Email address<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter email" 
        value={email} 
        onChange={e => setEmail(e.currentTarget.value)}/><br/>
  
      Password<br/>
      <input type="password" 
        className="form-control" 
        placeholder="Enter password" 
        value={password} 
        onChange={e => setPassword(e.currentTarget.value)}/><br/>
  
      <button type="submit" 
        className="btn btn-light" 
        onClick={handle}>Login</button>
  
    </>);
  }