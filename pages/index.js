import Head from "next/head";
import { Text, Link, Navbar, Spacer, Divider, Button,Row,Card,Grid} from "@nextui-org/react";
import path from 'path'
import getConfig from 'next/config'


export default function Home(props) {
    const songs=props.songs
    return (
        <>
            <Head>
                <title>SBH FM Radio</title>
            </Head>
            <Navbar isBordered isCompact variant="sticky" css={{bgBlur: "#000000"}}>
                <Navbar.Brand>
                    <Text h3 css={{textGradient: "45deg, $blue600 -20%, $pink600 50%"}}>SBH-Radio</Text>
                </Navbar.Brand>
                <Navbar.Content activeColor="secondary">
                <Navbar.Item><Button auto bordered color="gradient" onClick={()=>{
                    document.getElementById("player").play()
                }}>Play</Button></Navbar.Item>
                <Navbar.Item><Button auto bordered color="gradient" onClick={()=>{
                    document.getElementById("player").pause()
                }}>Pause</Button></Navbar.Item>
                <Navbar.Item><Button auto bordered color="gradient"><Link color="text" href="/">Home</Link></Button></Navbar.Item>
                </Navbar.Content>
            </Navbar>
            <audio src="" id="player" onEnded={()=>{
                var index_=songs.indexOf(document.getElementById("player").src.replace(".mp3","").replace("/music/",""))
                if ( index_==songs.length ) {
                    document.getElementById("player").src=("/music/"+songs[0]+".mp3")
                } else {
                    document.getElementById("player").src=("/music/"+songs[index_+1]+".mp3")
                }
                document.getElementById("player").play()
            }}></audio>
            <Spacer></Spacer>
            {songs.map((x)=>{return (
                <>
            <Row css={{"paddingLeft":10}}>
            <Card css={{ p: "$6", mw: "400px" }}
            isPressable
            isHoverable
            onPress={(x)=>{
                document.getElementById("player").src=("/music/"+x.target.innerText+".mp3")
                document.getElementById("player").play()
            }}
            name={x.name}
            >
            <Card.Header>
                <img
                alt="nextui logo"
                src={"/disc.png"}
                width="68px"
                height="68px"
                />
                <Grid.Container css={{ pl: "$6" }}>
                <Grid xs={12}>
                    <Text h4 css={{ lineHeight: "$xs" }}>
                    {x}
                    </Text>
                </Grid>
                </Grid.Container>
            </Card.Header>
            </Card>
            </Row>
            <Spacer/>
            </>
            )
            })}
        </> 
    )
}

export function getServerSideProps(context) {
    const fs=require('fs');
    const { join } = require('path');
    function getFiles (dir, files_){
        var dir=join(process.cwd(),"public","music")
        files_ = files_ || [];
        var files = fs.readdirSync(dir);
        for (var i in files){
            var name = files[i].replace(".mp3","");
            files_.push(name);
        }
        return files_;
    }
    return {props:{"songs":getFiles("/public/music")}}
}