const config = {
    presets: [
        ["@babel/preset-env", {
            "targets": {
                "browsers": ["> 0.25%", "ie >= 11"]
            }
        }],
        "@babel/preset-react"
    ],
    plugins: [
        "@babel/plugin-transform-runtime",
        ["@babel/plugin-proposal-class-properties", {
            loose: true
        }],
        "transform-react-remove-prop-types"
    ]
};

module.exports = config;