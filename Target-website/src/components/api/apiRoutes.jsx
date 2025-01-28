import { useState } from "react";


// Fetch party organizations
export const fetch_party_organizations = async () => 
  {
  const [partries, setParties] = useState([]);
    
    const response = await fetch("/api/parties", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": true,
      },
    });
    const data = await response.json();
    if(data) {
      // console.log(data);
      setParties(data);
    }
    else
    {
      console.error("Error fetching party organizations");
      
    }
  
  };


export default fetch_party_organizations;


