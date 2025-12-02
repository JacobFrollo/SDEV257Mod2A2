import React, { useState } from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";

//

function Placeholder(props) {
    if (props.loaded) {
        return null;
    } else {
        return <Image style={props.style} source={"https://m.media-amazon.com/images/M/MV5BMTA0Mjc0NzExNzBeQTJeQWpwZ15BbWU3MDEzMzQ3MDI@._V1_FMjpg_UX1000_.jpg"}></Image>;
    }
}

export default function LazyImage(props) {
    const [loaded, setLoaded] = useState(false);

    return (
        <View style={props.style}>
            <Placeholder loaded={loaded} {...props} />
            <Image
                {...props}
                onLoad={() => {
                    setLoaded(true);
                }}
            />
        </View>
    );
}

LazyImage.propTypes = {
    style: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
    }),
};