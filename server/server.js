const express=require("express")
const mysql=require("mysql2")
const cors=require("cors")
const app=express()
const cred={ host: "localhost",user: "root",password: "Arduino1",database:"olabs"}
app.use(express.json())
app.use(cors())
function connectMaria(){
    con = mysql.createConnection(cred);
    con.connect(function(Err){
        if(Err){
            setTimeout(connectMaria,5000)
        }else{
            console.log("Connected With Maria ;)")
        }
    })
};
connectMaria()
app.use(cors());
<<<<<<< Updated upstream
app.get("/test",(req,res)=>{
    res.json({message:"Hi ;)"})
})
app.post("/addUser",(req,res)=>{
    const data=req.body
    con.query('SELECT * FROM users WHERE email = ?', [data.email], (err, result) => {
        if (err) return res.status(500).send('Database error');
        if (result.length > 0) return res.status(200).send('User already exists');
        con.query(
          'INSERT INTO users (email, name, image) VALUES (?, ?, ?)',
          [data.email, data.name, data.image],
          (err) => {
            if (err) return res.status(500).send('Failed to insert user');
            return res.status(200).send('User added');
          }
        );
    })
})
app.listen(8000,()=>{
    console.log("Server Is Starting ;)")
})
=======
app.use(express.json());

// Google Gemini API setup
const genAI = new GoogleGenerativeAI("AIzaSyDc1EbQTMOu6Xf_H4ornxzTArwWeWnETYc"); // Replace with your actual API key
// Function to extract YouTube video ID

// Function to generate summary using Gemini AI
async function generateSummary(transcript) {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const prompt = `Summarize the following: ${transcript}`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini API error:", error);
        return "Error generating summary.";
    }
}
function extractVideoId(url) {
    const regExp = /^.*((http:\/\/googleusercontent\.com\/youtube\.com\/5\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
  }
  
// API to summarize YouTube video transcript
app.post('/summarize', async (req, res) => {
    const { youtubeLink } = req.body;
    if (!youtubeLink) return res.status(400).json({ error: 'YouTube link is missing.' });

    try {
        const videoId = extractVideoId(youtubeLink);
        if (!videoId) return res.status(400).json({ error: 'Invalid YouTube URL' });

        const transcriptArray = await YoutubeTranscript.fetchTranscript(videoId);
        const transcript = transcriptArray.map(item => item.text).join(' ');
        const summary = await generateSummary(transcript);
        res.json({ summary });
    } catch (error) {
        console.error('Error in /summarize:', error);
        res.status(500).json({ error: 'Failed to summarize video.' });
    }
});

// API to fetch YouTube video transcript
app.post('/transcript', async (req, res) => {
    console.log("In")
    const { youtubeLink } = req.body;
    if (!youtubeLink) return res.status(400).json({ error: 'YouTube link is missing.' });

    try {
        const videoId = extractVideoId(youtubeLink);
        console.log(videoId);
        if (!videoId) return res.status(400).json({ error: 'Invalid YouTube URL' });

        const transcriptArray = await YoutubeTranscript.fetchTranscript(videoId);
        const transcript = transcriptArray.map(item => item.text).join('\n\n');
        res.json({ transcript });
    } catch (error) {
        console.error('Error fetching transcript:', error);
        res.status(500).json({ error: 'Failed to fetch transcript.' });
    }
});

// Test API
app.get('/test', (req, res) => {
    res.json({ message: "Server is running." });
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
>>>>>>> Stashed changes
