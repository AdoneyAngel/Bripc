import React from 'react'

export default function DarkenBody (){
    const styles = {
        width: '100%',
        height: '100vh',
        zIndex: '8',
        background: '#0000002e',
        position: 'absolute',
        backdropFilter: 'grayscale(1)',
        animation: 'openDisplayAni 0.2s linear'
    }

    return (
        <div style={styles}></div>
    )
}