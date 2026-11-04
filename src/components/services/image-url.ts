import placeholderImage from "@/assets/no-image-placeholder-6f3882e0.webp";

const getImageUrl = (url: string) => {
	return url || placeholderImage;
};

export default getImageUrl;
