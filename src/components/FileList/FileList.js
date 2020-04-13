import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/ClearAll';
import File from '../File';
import { getFileIds, getFilesById } from '../../store/file/file.selectors';
import { addFiles, clearFiles, deleteFiles } from '../../store/file/file.actions';
import IconButton from '../IconButton';
import Dropzone from '../Dropzone';

const useStyles = makeStyles(theme => ({
    clearButton: {
        bottom: theme.spacing(),
        left: 0,
        margin: '0 auto',
        position: 'absolute',
        right: 0,
    },
    fab: {
        bottom: theme.spacing(2),
        position: 'absolute',
        right: theme.spacing(2),
    },
    fileList: {
        flex: 1,
        height: '100%',
        position: 'relative',
    },
    filesWrapper: {
        height: '100%',
        overflow: 'auto',
        padding: theme.spacing(2),
    },
}));

const FileList = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const classes = useStyles();
    const fileIds = useSelector(getFileIds);
    const filesById = useSelector(getFilesById);
    const [isHover, setIsHover] = useState(false);
    const shouldDisplayClearButton = fileIds.length && isHover;

    const handleClearFiles = useCallback(() => dispatch(clearFiles), [dispatch]);
    const handleDeleteFile = useCallback(fileId => () => dispatch(deleteFiles([fileId])), [dispatch]);

    const handleMouseEnter = useCallback(() => setIsHover(true), []);
    const handleMouseLeave = useCallback(() => setIsHover(false), []);

    const handleFilesSelected = useCallback(selectedFiles => dispatch(addFiles(Object.values(selectedFiles))), [
        dispatch,
    ]);

    return (
        <div className={classes.fileList} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className={classes.filesWrapper}>
                <Dropzone onDrop={handleFilesSelected}>
                    {fileIds.map(fileId => (
                        <File file={filesById[fileId]} key={fileId} onDeleteFile={handleDeleteFile(fileId)} />
                    ))}
                </Dropzone>
            </div>
            {shouldDisplayClearButton && (
                <IconButton className={classes.clearButton} label={t('clearFileList')} onClick={handleClearFiles}>
                    <ClearIcon />
                </IconButton>
            )}
        </div>
    );
};

export default FileList;
