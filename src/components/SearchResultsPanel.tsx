import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { PlaceDetails } from "../hooks/useDetailedNearbySearch";

interface Props {
  results: PlaceDetails[];
  visible: boolean;
  onSelect: (place: PlaceDetails) => void;
}

const typeLabels: Record<PlaceDetails["type"], string> = {
  church: "Kościół",
  mosque: "Meczet",
  synagogue: "Synagoga",
  hindu_temple: "Świątynia hinduistyczna",
  buddhist_temple: "Świątynia buddyjska",
  shinto_shrine: "Chram shintō",
  orthodox_church: "Cerkiew prawosławna"
};

const SearchResultsPanel: React.FC<Props> = ({ results, visible, onSelect }) => {
  return (
    <Drawer anchor="right" open={visible} variant="persistent">
      <Box sx={{ width: 320, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Wyniki wyszukiwania ({results.length})
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          {results.map((place) => (
            <ListItem
              key={place.id}
              component="button"
              onClick={() => onSelect(place)}
              alignItems="flex-start"
              sx={{
                textAlign: 'left',
                width: '100%',
                border: 'none',
                background: 'none',
                padding: '8px 16px',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              <ListItemAvatar>
                <Avatar
                  alt={place.name}
                  src={place.photos?.[0] || undefined}
                />
              </ListItemAvatar>
              <ListItemText
                primary={place.name}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {typeLabels[place.type]}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SearchResultsPanel;
