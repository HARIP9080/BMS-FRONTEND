import { useEffect, useState } from "react";
import {
  Box,
  InputBase,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Typography,
  Card,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add"; // Import the Add icon

const SearchNotes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState(notes);

  // Fetch notes from the API when the component mounts
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/records`);
        if (response.ok) {
          const data = await response.json();
          setNotes(data); // Assuming the API returns an array of notes
          setFilteredNotes(data); // Initialize filtered notes
        } else {
          console.error("Error fetching notes: ", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching notes: ", error);
      }
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredNotes(notes); // If searchTerm is empty, reset to all notes
    } else {
      const filtered = notes.filter((note) =>
        (note.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
         note.descriptions?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredNotes(filtered);
    }
  }, [searchTerm, notes]);
  

  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleAddNote = () => {
    console.log("Add new note");
  };

  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 2,
        maxHeight: "510px", 
        overflowY: "auto",
        backgroundColor: "#fff",
        boxShadow: 'none', 
      }}
    >
      {/* Search bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderBottom: 1,
          borderColor: "divider",
          mb: 2,
          pb: 1,
        }}
      >
        <SearchIcon sx={{ color: "gray" }} />
        <InputBase
          placeholder="Search notes"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ ml: 2, color: "gray", fontSize: "0.875rem" }}
        />
        <IconButton onClick={handleAddNote} sx={{ ml: 1 }}>
          <AddIcon sx={{ color: "#60a5fa" }} />
        </IconButton>
      </Box>

      {/* Notes list */}
      <List
        sx={{
          height: 411,
          p: 2,
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: 4 },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#888", borderRadius: 4 },
          "&::-webkit-scrollbar-track": { background: "#f1f1f1" },
        }}
      >
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div key={note.id}>
              <ListItem alignItems="flex-start" sx={{ height: "60px", }}> 
                <ListItemText
                  primary={
                    <Typography fontWeight="bold" sx={{ fontSize: "0.875rem" }}>
                      {note.title}
                    </Typography>
                  }
                  secondary={
                    <Typography color="textSecondary" sx={{ fontSize: "0.75rem" }}>
                      {note.descriptions}
                    </Typography>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(note.id)}
                  >
                    <DeleteIcon
                      sx={{ color: "gray", "&:hover": { color: "red" }, fontSize: "1.125rem" }}
                    />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          ))
        ) : (
          <Typography color="textSecondary" align="center" sx={{ fontSize: "0.875rem" }}>
            No notes found.
          </Typography>
        )}
      </List>
    </Card>
  );
};

export default SearchNotes;
