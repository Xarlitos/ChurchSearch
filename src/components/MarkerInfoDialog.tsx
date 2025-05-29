import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Link from "@mui/material/Link";

export interface Marker {
  id: string;
  name: string;
  position: { lat: number; lng: number };
  address: string;
  rating?: number;
  userRatingsTotal?: number;
  website?: string;
  phone?: string;
  type?: string;
  photos?: string[];  // dodane pole na zdjęcia
}

interface MarkerInfoDialogProps {
  open: boolean;
  onClose: () => void;
  marker: Marker | null;
  setRoute: (position: { lat: number; lng: number }) => void;
}

const MarkerInfoDialog: React.FC<MarkerInfoDialogProps> = ({
  open,
  onClose,
  marker,
  setRoute,
}) => {
  if (!marker) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{marker.name}</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body2" gutterBottom>
          <strong>Coordinates:</strong> {marker.position.lat.toFixed(6)}, {marker.position.lng.toFixed(6)}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <strong>Address:</strong> {marker.address}
        </Typography>

        {marker.rating !== undefined && (
          <Typography variant="body2" gutterBottom>
            <strong>Rating:</strong> {marker.rating} ({marker.userRatingsTotal || 0} reviews)
          </Typography>
        )}

        {marker.phone && (
          <Typography variant="body2" gutterBottom>
            <strong>Phone:</strong> {marker.phone}
          </Typography>
        )}

        {marker.website && (
          <Typography variant="body2" gutterBottom>
            <Link href={marker.website} target="_blank" rel="noopener noreferrer">
              Website
            </Link>
          </Typography>
        )}

        {marker.type && (
          <Typography variant="body2" gutterBottom sx={{ color: 'blue', fontWeight: 'bold' }}>
            <strong>Type:</strong> {marker.type}
          </Typography>
        )}
        
        {marker.photos && marker.photos.length > 0 && (
          <Box mt={2} mb={2} textAlign="center">
            <img
              src={marker.photos[0]}
              alt={marker.name}
              style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8 }}
            />
          </Box>
        )}

        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={
              <img src="route.png" alt="route" style={{ width: 20, height: 20 }} />
            }
            onClick={() => {
              setRoute(marker.position);
              onClose();
            }}
            fullWidth
          >
            Set Route
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default MarkerInfoDialog;
