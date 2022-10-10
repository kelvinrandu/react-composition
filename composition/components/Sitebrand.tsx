import {
  Box,
  BoxProps,
  Image,
  ImageProps,
  Text,
  TextProps,
} from "@chakra-ui/react";
import React from "react";

export enum LabelPosition {
  Top,
  Bottom,
}

interface ILabelProps extends TextProps {
  borderRadius?: string;
  labelPosition?: LabelPosition;
  children?: React.ReactNode;
}

const Label: React.FunctionComponent<ILabelProps> = ({
  children,
  labelPosition = LabelPosition.Top,
  borderRadius = "lg",
  ...props
}) => (
  <Text
    position="absolute"
    overflow="hidden"
    textOverflow="ellipsis"
    whiteSpace="nowrap"
    top={labelPosition === LabelPosition.Top ? "0" : "auto"}
    bottom={labelPosition === LabelPosition.Bottom ? "0" : "auto"}
    borderTopRadius={labelPosition === LabelPosition.Top ? borderRadius : "0"}
    borderBottomRadius={
      labelPosition === LabelPosition.Bottom ? borderRadius : "0"
    }
    fontSize={["9px", "12px"]}
    display="block"
    textAlign="center"
    width="full"
    left="0"
    as="span"
    bg="brand.700"
    zIndex="5"
    fontWeight="bold"
    px="2"
    {...props}
  >
    {children}
  </Text>
);

const Logo: React.FunctionComponent<ImageProps> = (props) => (
  <Image w="full" px="2" py="4" {...props} />
);

interface ISiteBrandComposition {
  Logo: React.FunctionComponent<ImageProps>;
  Label: React.FunctionComponent<ILabelProps>;
}

interface SiteBrandProps extends BoxProps {
  children?: React.ReactNode;
  borderRadius?: string;
  boxShadow?: string;
}

type SiteBrandElementType = ILabelProps | ImageProps;

const SiteBrand: React.FunctionComponent<SiteBrandProps> &
  ISiteBrandComposition = ({
  children,
  borderRadius = "lg",
  boxShadow = "lg",
  ...props
}) => {
  return (
    <Box
      overflow="hidden"
      boxShadow={boxShadow}
      width="100%"
      pt="100%"
      bg="white"
      borderTopRadius={borderRadius}
      borderBottomRadius={borderRadius}
      {...props}
      position="relative"
      as="span"
      display="block"
    >
      <Box
        position="absolute"
        top="0"
        bottom="0"
        width="100%"
        height="100%"
        as="span"
        display="block"
      >
        {React.Children.map(children, (child, index) => {
          //@ts-ignore
          if (!React.isValidElement<SiteBrandElementType>(child)) {
            return child;
          }
          let elementChild: React.ReactElement<SiteBrandElementType> = child;
          //@ts-ignore
          if (elementChild.type.name === "Label") {
            return React.cloneElement(elementChild, {
              labelPosition:
                index === 0 ? LabelPosition.Top : LabelPosition.Bottom,
              borderRadius: borderRadius,
            });
          }
          //@ts-ignore
          else if (elementChild.type.name === "Logo") {
            return elementChild;
          } else {
            return elementChild;
          }
        })}
      </Box>
    </Box>
  );
};

SiteBrand.Label = Label;
SiteBrand.Logo = Logo;

export default SiteBrand;
