const { Preview } = require("../models");
const mongoose = require('mongoose')
const fs = require('fs')
// const myDatabase = require('../database.json')

module.exports = {
  /**
   * GET /api/v1/preview
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  getAllPreviews: async (req, res) => {
    try {
      // const previews = await Preview.find({});
      const previews = await fs.readFile('./database.json', 'utf-8', (err, jsonString) => {
        if(err) {
          console.log(err)
        } else {
          console.log(jsonString)
        }
      })
      return res.status(200).json({
        success: true,
        message: "Successfully retrieved all previews",
        data: previews,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        data: error,
      });
    }
  },

  /**
   * POST /api/v1/preview
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  createNewPreview: async (req, res) => {
    try {
      const preview = [{
        previewId: req.body.previewId,
        previewData: req.body.previewData,
      }]

      let data = JSON.stringify(preview, null, 2)

    await fs.writeFile('./database.json', data, {'flags': 'wx'} , (err) => {
      if (err) throw err
     })
      return res.status(200).json({
        success: true,
        message: "Successfully created the preview",
        data: preview,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        data: error,
      });
    }
  },


  /**
   * PUT /api/v1/preview/:id
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
   updateSinglePreview: async (req, res) => {
    mongoose.Types.ObjectId.isValid('previewId');
    try {
      const preview = await Preview.findByIdAndUpdate({ previewId: req.params.id }, {
        previewId: req.body.previewId,
        previewData: req.body.previewData,
      }, {
        upsert: true,
      });
      if (!preview) {
        return res.status(404).json({
          success: true,
          message: 'Preview not found',
          data: null,
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Successfully updated the preview',
        data: preview,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        data: error,
      });
    }
  },

    /**
   * GET /api/v1/preview/:id
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
     showSinglePreview: async (req, res) => {
      try {
        const preview = await Preview.find({previewId: req.params.id});
        if (!preview) {
          return res.status(404).json({
            success: true,
            message: 'Preview not found',
            data: null,
          });
        }
        return res.status(200).json({
          // success: true,
          // message: 'Successfully retrieved the preview',
          data: preview,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
          data: error,
        });
      }
    },

  /**
   * DELETE /api/v1/preview/:id
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  deleteSinglePreview: async (req, res) => {
    try {
      await Preview.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        success: true,
        message: "Successfully deleted the preview",
        data: null,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        data: error,
      });
    }
  },
};
