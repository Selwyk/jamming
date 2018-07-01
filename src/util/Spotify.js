let accessToken = null;

const Spotify = {

    getAccessToken(){
      if(accessToken){
        return accessToken;
      }
    }
    
}

export default Spotify;
