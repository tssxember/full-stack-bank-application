function Main(props){
    const [count, setCount] = React.useState(0);
    
    function handleClick() {
        setCount(1);
        console.log(`main-count: ${count}`);        
    }

    function logOut() {
        setCount(0);
        console.log(`main-count: ${count}`);        
    }

    return (      
        <>   
        <NavBar count={count} />
                    <div className="container d-flex justify-content-center" style={{padding: "20px"}}>
                        <Route path="/" exact component={Home}/>
                        <Route path="/CreateAccount/" component={CreateAccount}/>
                        <Route path="/Login/"> <Login count={count} handleClick={handleClick}/> </Route>
                        <Route path="/Logout/"> <Logout count={count} logOut={logOut}/> </Route>
                        <Route path="/Deposit/" component={Deposit}/>
                        <Route path="/Withdraw/" component={Withdraw}/>
                        <Route path="/Balance/" component={Balance}/>
                        <Route path="/alldata/" component={AllData}/>
                    </div> 
        </>  
      
      );  
}