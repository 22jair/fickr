import { Button, Typography } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import SaveIcon from '@material-ui/icons/Save';

const PreviewContainer = styled.div`
    margin-left:auto;
    margin-right:auto;
    width: 200px;
    height:150px;
`

const StyledImg = styled.img`

`

function PhotoPreview({image, onClick}) {
    return (
        <>
            <Typography variant="subtitle1">
                Vista previa...
            </Typography>
            <PreviewContainer>
                <img style={{height: "100%", width: "100%"}} src={image}></img>
            </PreviewContainer>
    <Button onClick={() => onClick()} variant="contained" color="secondary" component="span" startIcon={<SaveIcon />}>
                            Subelo ya!
            </Button>
            
        </>
    )
}

export default PhotoPreview


