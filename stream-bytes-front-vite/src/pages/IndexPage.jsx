const IndexPage = () => {

    return (
        <>
            <div>
                {videoResponse ? videoResponse.map((video) => (
                    <div key={video.id}>

                    </div>
                )) : "no videos uploaded yet"}
            </div>
        </>
    )
}

export default IndexPage