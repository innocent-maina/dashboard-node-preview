const { Preview } = require("../models");

module.exports = {
  /**
   * GET /api/v1/previews
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  getAllPreviews: async (req, res) => {
    try {
      const previews = await Preview.find({});
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
   * POST /api/v1/previews
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  createNewPreview: async (req, res) => {
    try {
      const preview = await Preview.create(req.body);
      // const previewGivenId = req.body.sessionId
      // console.log(`Created preview successfully, sessionId: ${previewGivenId}`)
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

  // /**
  //  * GET /api/v1/previews/:id
  //  *
  //  * @param req
  //  * @param res
  //  * @returns {Promise<*>}
  //  */
  // showSinglePreview: async (req, res) => {
  //   try {
  //     const previewData = await Preview.find().sort({_id:-1}).limit(1);
  //     const previewId = previewData[0]._id
  //     console.log(previewId)
  //     const preview = await Preview.findById(previewId);
  //     // console.log(`New preview launched, sessionId: ${previewId}`)
  //     if (!preview) {
  //       return res.status(404).json({
  //         success: true,
  //         message: "Preview not found",
  //         data: null,
  //       });
  //     }
  //     return res.status(200).json({
  //       success: true,
  //       message: "Successfully retrieved the preview",
  //       data: preview,
  //     });
  //   } catch (error) {
  //     return res.status(500).json({
  //       success: false,
  //       message: error.message,
  //       data: error,
  //     });
  //   }
  // },

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
   * DELETE /api/v1/previews/:id
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
