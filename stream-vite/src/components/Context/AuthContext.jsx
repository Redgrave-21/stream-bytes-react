import { create } from "zustand"

const useAuthStore = create((set) => ({
    loggedIn: false,
    UID:'',
    setLoggedIn:(UID)=>set(()=>({loggedIn:true, UID:UID})),
    setLoggedOut:()=>set({loggedIn:false, UID:''})
    // setLoggedIn: () => set({ loggedIn: true }),
    // setLoggedOut: () => set({ loggedIn: false })
}))

export default useAuthStore
