import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function Networkfee(props: {  openNetWorkfee: any, setOpenNetworkfee:any }) {
    const { openNetWorkfee, setOpenNetworkfee } = props;

    const handleClose = () => {
        setOpenNetworkfee(false);
    };

    return (
        <div>
            <Dialog
                open={openNetWorkfee}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: {
                        bottom: '18%',
                        margin: '5px 12px',
                        boxShadow: 'none'
                    },
                }}
            >
                <DialogContent sx={{ padding: '5px 15px' }} >
                    <DialogContentText id="alert-dialog-description" sx={{}}>
                        The amount shown here is an estimate and the actual will be determined at the time when this transaction is processed.
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div >
    );
}