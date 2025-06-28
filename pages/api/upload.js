import nextConnect from 'next-connect';
import multer from 'multer';

const upload = multer({ dest: '/tmp/docs' });
const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: \`Sorry something happened! \${error.message}\` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: \`Method '\${req.method}' Not Allowed\` });
  },
});

apiRoute.use(upload.array('docs'));

apiRoute.post((req, res) => {
  // TODO: index docs for AI context
  res.status(200).json({ uploaded: req.files.length });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false
  }
};
