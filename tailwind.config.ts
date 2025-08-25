import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				background: {
					DEFAULT: "hsl(var(--background))",
					secondary: "hsl(var(--background-secondary))",
				},
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
					glass: "hsl(var(--card-glass))",
					border: "hsl(var(--card-border))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					dark: "hsl(var(--primary-dark))",
					light: "hsl(var(--primary-light))",
					foreground: "hsl(var(--primary-foreground))",
					hover: "hsl(var(--primary-hover))",
					glow: "hsl(var(--primary-glow))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
					hover: "hsl(var(--secondary-hover))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					dark: "hsl(var(--accent-dark))",
					light: "hsl(var(--accent-light))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				success: {
					DEFAULT: "hsl(var(--success))",
					foreground: "hsl(var(--success-foreground))",
					glow: "hsl(var(--success-glow))",
				},
				warning: {
					DEFAULT: "hsl(var(--warning))",
					foreground: "hsl(var(--warning-foreground))",
					glow: "hsl(var(--warning-glow))",
				},
				border: "hsl(var(--border))",
				input: {
					DEFAULT: "hsl(var(--input))",
					border: "hsl(var(--input-border))",
				},
				ring: "hsl(var(--ring))",
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
				},
			},
			backgroundImage: {
				"gradient-primary": "var(--gradient-primary)",
				"gradient-secondary": "var(--gradient-secondary)",
				"gradient-accent": "var(--gradient-accent)",
				"gradient-glow": "var(--gradient-glow)",
				"gradient-hero": "var(--gradient-hero)",
				"gradient-card": "var(--gradient-card)",
				"gradient-glass": "var(--gradient-glass)",
			},
			boxShadow: {
				soft: "var(--shadow-soft)",
				medium: "var(--shadow-medium)",
				large: "var(--shadow-large)",
				glow: "var(--shadow-glow)",
				"accent-glow": "var(--shadow-accent-glow)",
				glass: "var(--shadow-glass)",
				float: "var(--shadow-float)",
			},
			transitionProperty: {
				smooth: "var(--transition-smooth)",
				bounce: "var(--transition-bounce)",
				glow: "var(--transition-glow)",
				sidebar: "var(--transition-sidebar)",
				micro: "var(--transition-micro)",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "var(--radius-sm)",
				xl: "var(--radius-lg)",
				"2xl": "var(--radius-xl)",
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				display: ['Poppins', 'system-ui', 'sans-serif'],
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0", opacity: "0" },
					to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
					to: { height: "0", opacity: "0" },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' },
				},
				glow: {
					'from': { 
						boxShadow: '0 0 20px hsl(var(--primary) / 0.2)' 
					},
					'to': { 
						boxShadow: '0 0 40px hsl(var(--primary) / 0.4), 0 0 60px hsl(var(--primary) / 0.2)' 
					},
				},
				'slide-up': {
					'from': {
						opacity: '0',
						transform: 'translateY(40px)',
					},
					'to': {
						opacity: '1',
						transform: 'translateY(0)',
					},
				},
				'fade-in': {
					'from': { opacity: '0' },
					'to': { opacity: '1' },
				},
				'scale-in': {
					'from': { transform: 'scale(0.95)', opacity: '0' },
					'to': { transform: 'scale(1)', opacity: '1' },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
				"accordion-up": "accordion-up 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
				float: "float 6s ease-in-out infinite",
				glow: "glow 2s ease-in-out infinite alternate",
				'slide-up': "slide-up 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
				'fade-in': "fade-in 0.6s ease-out",
				'scale-in': "scale-in 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
