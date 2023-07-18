function Deposit(){
    const [show, setShow]     = React.useState(true);
    const [status, setStatus] = React.useState('');    
      
    return (
      <Card          
        bgcolor="secondary"
        header="Deposit Money"
        status={status}
        body={show ? 
          <CreateDepositForm setShow={setShow} setStatus={setStatus}/> : 
          <CreateDepositMsg setShow={setShow}/>}
      />      
    )
  }
  
  function CreateDepositMsg(props){
    return(<>
      <h5>Success</h5>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => props.setShow(true)}>Deposit More Money?</button>
    </>);
  }
  
  function CreateDepositForm(props){
    const ctx = React.useContext(UserContext);
    const [deposit, setDeposit]   = React.useState(''); 
    let balance = ctx.users[0].balance;
    const email = ctx.users[0].email;

    function validate(field, label){
      if (field) {
        props.setStatus('Error: ' + label);
        setTimeout(() => props.setStatus(''),3000);
        return false;
      }      
      return true;
    } 
    
    function handle(){
      console.log(email,deposit);   
      
      if (!validate(isNaN(deposit),     'Enter numbers only'))     return;
      if (!validate((deposit < 0),     'Enter positive value'))     return;

      //find current balance
      const url = `/findone/${email}`;
      
      (async () => {

        //find current balance
        let resFind = await fetch(url);
        console.log(resFind);
        let dataFind = await resFind.json();
        console.log(dataFind);

        
        let currentBalance = dataFind.balance;        
        let newBalance = Number(deposit) + Number(currentBalance); 
        ctx.users[0].balance = newBalance;

        //update current balance
        const urlUpdate = `/update/${email}/${newBalance}`;
        let resDeposit = await fetch(urlUpdate);
        let dataDeposit = await resDeposit.json(); 
        console.log(dataDeposit);

      })();  

      props.setShow(false);
    }    
  
    return (<>
      <p><b>User: </b>{email}</p>
      <p><b>Balance: </b>{balance}</p>
      
      Deposit<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter deposit amount" 
        value={deposit} 
        onChange={e => setDeposit(e.currentTarget.value)} /><br/>
       
      <button type="submit" 
        className="btn btn-light" 
        onClick={handle}>Deposit Money</button>
  
    </>);
  }