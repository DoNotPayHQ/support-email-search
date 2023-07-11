class DevConfig {
	PORT = 8002
}

class StagingConfig {
	PORT = 8002
}

class ProdConfig {
	PORT = 8002
}

let config

if (process.env.NODE_ENV === 'production') {
	config = new ProdConfig()
} else if (process.env.NODE_ENV === 'staging') {
	config = new StagingConfig()
} else {
	config = new DevConfig()
}

config.env = process.env.NODE_ENV

export default config
