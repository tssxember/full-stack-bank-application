function Balance(){    
    return (
        <Card
            bgcolor="primary"
            header="Balance"
            status={''}
            body={<CreateBalanceForm/>}
        />
        )    
}

function CreateBalanceForm(props){  
    const [balance, setBalance]   = React.useState('');
    const ctx = React.useContext(UserContext);
    const email = ctx.users[0].email;

    //find current balance
    const url = `/findone/${email}`;

         
    (async () => {

    //find current balance
    let resFind = await fetch(url);
    console.log(resFind);
    let dataFind = await resFind.json();
    console.log(dataFind);    
      
    setBalance(dataFind.balance) ;                     
    console.log(balance);

    })();  

    console.log(`BALANCE: ${balance}`);


    return (<>

      Current user:<br/>
      <p>{email}</p> 

      Balance:<br/>
      <p>{balance}</p>  
  
    </>);
  }