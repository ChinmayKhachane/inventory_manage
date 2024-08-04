'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import {firestore} from '@/firebase'
import { Box, Modal, Typography, Stack, TextField, Button, Container } from "@mui/material";
import { collection, count, doc, deleteDoc, getDocs, query, setDoc, getDoc } from "firebase/firestore";


export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(true)
  const [itemName, setItemName] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList)
    console.log(inventoryList)

  }
  const addItem = async (item) =>{
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const {count} = docSnap.data()
      await setDoc(docRef, {count: count + 1})
      }
    else{
      await setDoc(docRef, {count: 1})
    }
    await updateInventory()
    }

  
  

  const removeItem = async (item) =>{
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const {count} = docSnap.data()
      if (count === 1){
        await deleteDoc(docRef)
      }else{
        await setDoc(docRef, {count: count - 1})
      }
    }

    await(updateInventory())
  }



  useEffect(() => {
    updateInventory()

  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <Container maxWidth="md">
      <Box width="100%" height="100vh" display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap={2}>
        <Modal open={open} onClose={handleClose}>
          <Box position="absolute" top="50%" left="50%" width={400} bgcolor="background.paper" border="2px solid #000" boxShadow={24} p={4} display="flex" flexDirection="column" gap={3} sx={{ transform: 'translate(-50%, -50%)' }}>
            <Typography variant="h6">Add Item</Typography>
            <Stack width="100%" direction="row" spacing={2}>
              <TextField variant="outlined" fullWidth value={itemName} onChange={(e) => { setItemName(e.target.value) }} />
              <Button variant="contained" onClick={() => { addItem(itemName); setItemName(''); handleClose(); }}>Add</Button>
            </Stack>
          </Box>
        </Modal>
        <Button variant="contained" onClick={handleOpen}>Add new Item</Button>
        <Box width="100%" mt={3} mb={3} textAlign="center">
          <Typography variant="h4" color="primary">
            Inventory Items
          </Typography>
        </Box>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Stack width="100%" spacing={2} overflow="auto">
          {filteredInventory.map(({ name, count }) => (
            <Box key={name} width="100%" minHeight="150px" display="flex" alignItems="center" justifyContent="space-between" bgcolor="#e0f7fa" padding={3} borderRadius={2}>
              <Typography variant="h5" color="textPrimary" textAlign="center">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant="h5" color="textPrimary" textAlign="center">
                {count}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={() => addItem(name)}>Add</Button>
                <Button variant="contained" color="secondary" onClick={() => removeItem(name)}>Remove</Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Container>
  );
  
}
