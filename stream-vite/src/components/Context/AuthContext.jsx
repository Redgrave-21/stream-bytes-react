import { create } from "zustand"

const useAuthStore = create((set) => ({
    loggedIn: false,
    UID:'',
    role:'',
    setLoggedIn:(UID)=>set(()=>({loggedIn:true, UID:UID, role:role})),
    setAdminLoggedIn:(UID)=>set(()=>({loggedIn:true, UID:UID, role:role})),
    setLoggedOut:()=>set({loggedIn:false, UID:''})
    // setLoggedIn: () => set({ loggedIn: true }),
    // setLoggedOut: () => set({ loggedIn: false })
}))

export default useAuthStore
