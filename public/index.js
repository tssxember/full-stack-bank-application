function Spa(){    
     
    return (
        <HashRouter>
            <UserContext.Provider value={
                    {users: [{name:'', email: '', password: ''}]}
                }>
                <Main/>
            </UserContext.Provider>
              
        </HashRouter>   
        
    );
    
};

ReactDOM.render(
    <Spa/>,
   document.getElementById('root')
);


