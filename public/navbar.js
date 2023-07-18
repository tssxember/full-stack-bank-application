function NavBar(props){
  const ctx = React.useContext(UserContext);
  let name = ctx.users[0].name;
  
  let verify = props.count;
  console.log(`nav-count: ${verify}`);

  return(
  
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#/CreateAccount/">Create Account</a>
            </li>
            {verify == 0 &&
              <>
                <li className="nav-item">
                  <a className="nav-link" href="#/login/">Login</a>
                </li>  
              </>
            }
            <li className="nav-item">
              <a className="nav-link" href="#/alldata/">AllData</a>
            </li>          
          </ul>          
            
            {verify == 1 && 
            <> 
            <ul className="navbar-nav">            
              <li className="nav-item">
                <a className="nav-link" href="#/deposit/">Deposit</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/withdraw/">Withdraw</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/logout/">Logout</a>
              </li>
            </ul>   
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="#/logout/">{name}</a>
              </li>
            </ul>            
            </>
            }          
                    
        </div>
      </nav>
  
    );
  }