How to Authorize with spotify by Sarah

Go to this URL (with your client_id and scopes):
https://accounts.spotify.com/authorize?client_id=c7b4a3a795584670868e144657e9a7c0&response_type=code&redirect_uri=http%3A%2F%2Flocalhost:3000&scope=user-read-currently-playing%20user-top-read

From the URL it takes you to, get the code:
AQC4LwOLU_brGi6IKhlgI1Q8RDZz3OQDV0sf_bYynMRg1ecHrUj_dOLI48m755v8sIp4iHjYYmhAkpebK9nbqO-iQiQunHevvM2mJLoxS0dDdL7vvtpQ2y8H-FnAtic2cSP7d0pgSSehxlVzY9Qc8X8aqe6naTWDbVhsfNQJukibdA4KsVA_JRExJ9ZZKBnGxKuEwMSTQ6rmjdTuMf9SuC0Sog0w


Enter this in terminal: 
with the base64 encoded client_id:client-secret: YzdiNGEzYTc5NTU4NDY3MDg2OGUxNDQ2NTdlOWE3YzA6YWFlMWVjOWJkOWQ0NDIxODk3NjgxMzA1YWRiMWQ4MzI=

curl -H "Authorization: Basic YzdiNGEzYTc5NTU4NDY3MDg2OGUxNDQ2NTdlOWE3YzA6YWFlMWVjOWJkOWQ0NDIxODk3NjgxMzA1YWRiMWQ4MzI=" -d grant_type=authorization_code -d code=<code> -d redirect_uri=http%3A%2F%2Flocalhost:3000 https://accounts.spotify.com/api/token

get the token and put it in env variables