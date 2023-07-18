function AllData(){
    const [data, setData] = React.useState('');
    
    React.useEffect(() => {

        //fetch all accounts from API
        fetch('/accounts/all')
            .then(response => response.json())
            .then(data => {                
                setData(data);
               console.logdata;                 
            })        
    }, []);

    return(  
        <>
                
        <table className="table table-striped table-dark">
            <thead className="thead-light">
                <tr>          
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
                <th scope="col">Balance</th>
                </tr>
            </thead>
            <tbody>   
                {data !== '' && data.map(
                    (item,index) => {      
                        return <tr>      
                        <td key={index}>{item.name}</td>
                        <td key={index}>{item.email}</td>
                        <td key={index}>{item.password}</td>
                        <td key={index}>{item.balance}</td>
                        </tr>}
                )}                       
            </tbody>     
        </table>  
        </>
    );
}