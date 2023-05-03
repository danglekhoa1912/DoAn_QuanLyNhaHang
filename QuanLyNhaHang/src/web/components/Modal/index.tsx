import React, {useMemo} from 'react';
import {
  Button,
  IconButton,
  Modal as ModalDefault,
  ModalProps,
  ButtonProps,
  CardContent,
  CardHeader,
  CardActions,
} from '@mui/material';
import {makeStyles} from '@mui/styles';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {ResponsiveStyleValue, StyledEngineProvider} from '@mui/system';

const POSITION = {
  CENTER: {
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  LEFT: {
    left: 0,
  },
  RIGHT: {
    right: 0,
  },
};

interface IButton {
  title?: string;
  isShow?: boolean;
}

interface IModal {
  isShowFooter?: boolean;
  iconHeader?: React.ReactNode;
  header?: {
    title: string;
    style?: React.CSSProperties;
    className?: string;
  };
  position?: keyof typeof POSITION;
  minWidth?: number | string;
  height?: number | string;
  contentClassName?: string;
  saveButton?: IButton & ButtonProps;
  cancelButton?: IButton & ButtonProps;
  extraButton?: (IButton & ButtonProps)[];
  justifyContentButton?: ResponsiveStyleValue<
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'space-around'
    | 'space-between'
    | 'space-evenly'
  >;
  directionButton?: ResponsiveStyleValue<
    'column' | 'column-reverse' | 'row' | 'row-reverse'
  >;
}

const useStyles = makeStyles({
  root: {
    margin: 12,
  },
  container: {
    backgroundColor: '#ffffff',
    position: 'absolute',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    overflowWrap: 'break-word',
    maxWidth: '100%',
  },
  content: {
    flex: 1,
    overflowX: 'hidden',
    overflowY: 'auto',
    minHeight: 300,
    '&.MuiCardContent-root': {
      padding: '0 20px',
      '& > div': {
        gap: 12,
      },
    },
    border: `1px solid gray`,
    borderWidth: '1px 0',
  },
  button: {
    fontWeight: 'bold',
    '&:disabled': {
      opacity: 0.5,
    },
  },
});
function Modal(props: IModal & ModalProps) {
  const classes = useStyles();
  const {
    children,
    header,
    iconHeader,
    position = 'CENTER',
    minWidth = 420,
    height,
    title,
    open,
    style,
    saveButton,
    cancelButton,
    extraButton,
    directionButton = 'row',
    justifyContentButton = 'flex-end',
    contentClassName,
    isShowFooter = true,
    ...prop
  } = props;

  const ButtonList = useMemo(() => {
    const saveBtn = {
      title: saveButton?.title || 'Save',
      isShow: saveButton?.isShow || true,
      ...saveButton,
    };
    const cancelBtn = {
      title: cancelButton?.title || 'Cancel',
      isShow: cancelButton?.isShow || true,
      ...cancelButton,
    };

    return [
      cancelBtn,
      saveBtn,
      ...(extraButton?.map(button => ({
        isShow: button?.isShow || true,
        ...button,
      })) || []),
    ];
  }, [saveButton, cancelButton, extraButton]);
  return (
    <StyledEngineProvider injectFirst>
      <ModalDefault
        className={classes.root}
        {...prop}
        onClose={cancelButton?.onClick}
        open={open}>
        <div
          style={{
            ...POSITION[position],
            ...style,
            minWidth: minWidth,
            height: height,
            maxHeight: '80%',
          }}
          className={classes.container}>
          {header && (
            <CardHeader
              style={header?.style}
              className={header.className}
              avatar={iconHeader}
              titleTypographyProps={{variant: 'h4'}}
              title={header?.title}
              action={
                <IconButton onClick={cancelButton?.onClick}>
                  <CloseOutlinedIcon />
                </IconButton>
              }
            />
          )}
          <CardContent
            className={`${classes.content} ${contentClassName || ''}`}>
            {children}
          </CardContent>
          {isShowFooter && (
            <CardActions
              sx={{
                justifyContent: justifyContentButton,
                flexDirection: directionButton,
                flexWrap: 'wrap',
                padding: '16px',
              }}>
              {ButtonList?.map((button, index) => {
                const {title, className, isShow, ...props} = button;
                return (
                  isShow && (
                    <Button
                      key={index}
                      variant="contained"
                      className={`${classes.button} ${className} `}
                      {...props}>
                      {title || ''}
                    </Button>
                  )
                );
              })}
            </CardActions>
          )}
        </div>
      </ModalDefault>
    </StyledEngineProvider>
  );
}

export default Modal;
