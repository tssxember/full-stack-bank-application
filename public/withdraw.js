function Withdraw(){
    const [show, setShow]     = React.useState(true);
    const [status, setStatus] = React.useState('');
  
    return (
      <Card
        bgcolor="secondary"
        header="Withdraw Money"
        status={status}
        body={show ? 
          <CreateWithdrawForm setShow={setShow} setStatus={setStatus}/> : 
          <CreateWithdrawMsg setShow={setShow}/>}
      />
    )
  }
  
  function CreateWithdrawMsg(props){
    return(<>
      <h5>Success</h5>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => props.setShow(true)}>Withdraw More Money?</button>
    </>);
  }
  
  function CreateWithdrawForm(props){
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
        let newBalance = Number(currentBalance)- Number(deposit);        
        console.log(newBalance);
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
  
      Withdraw<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter withdraw amount" 
        value={deposit} 
        onChange={e => setDeposit(e.currentTarget.value)}/><br/>
          
      <button type="submit" 
        className="btn btn-light" 
        onClick={handle}>Withdraw Money</button>
  
    </>);
  }