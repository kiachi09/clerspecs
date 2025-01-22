// Word2Vec is a popular algorithm for learning word embeddings, which are dense vector representations of words in a high-dimensional space. The key idea behind Word2Vec is to capture the semantic and syntactic relationships between words based on their contextual usage in a large corpus of text.// Word2Vec consists of two main models: Continuous Bag-of-Words (CBOW) and Skip-gram. Both models aim to predict the target word given its context or the context given the target word.
// 1. Continuous Bag-of-Words (CBOW):
//    - In the CBOW model, the product is a context window of surrounding words, and the goal is to predict the target word.
//    - The context window consists of a fixed number of words before and after the target word.
//    - The model's architecture consists of an input layer, a hidden layer (projection layer), and an output layer.
//    - The input layer represents the context words, and the output layer represents the target word.
//    - The hidden layer, also known as the projection layer, learns the word embeddings.
//    - During training, the model adjusts the weights between the input and hidden layers to maximize the likelihood of correctly predicting the target word given the context.
// 2. Skip-gram:
//    - The Skip-gram model is the inverse of CBOW. It takes the target word as input and tries to predict the surrounding context words.
//    - The input layer represents the target word, and the output layer represents the context words.
//    - The hidden layer (projection layer) learns the word embeddings, similar to CBOW.
//    - During training, the model adjusts the weights between the input and hidden layers to maximize the likelihood of correctly predicting the context words given the target word.
// Both CBOW and Skip-gram models are trained using a technique called "negative sampling" or "hierarchical softmax." Negative sampling involves randomly selecting a small number of "negative" words (words not in the context) to contrast with the true context words. The model is trained to differentiate between the true context words and the negative samples.
// The training process involves iterating over a large corpus of text and updating the weights of the model using techniques like stochastic gradient descent. The objective is to learn word embeddings that capture meaningful relationships between words, so similar words are closer together in the embedding space.
// After training, the word embeddings can be used to perform various natural language processing (NLP) tasks. For example, you can calculate the similarity between words based on the cosine similarity between their corresponding vectors. Additionally, the word embeddings can be used as features in machine learning models for tasks like sentiment analysis, text classification, and information retrieval.
// Word2Vec has become popular due to its ability to capture semantic relationships between words. For example, in the learned word embedding space, the vector representation for "king" might be closer to "queen" than to "car." This ability to capture semantic relationships allows Word2Vec to provide meaningful representations for words, making it a powerful tool in NLP applications.

// there were many problems with word2vec package because of only unix operating system thingy, therefore has to use tensorflow.js or fasttext.js and their word2vec smilar models for it.

// after doing deep research for hosted free without api key model online, i met with failure, so had to sign in hugging face and open ai and lastly went for OpenAI embeddings, openAI = $ so rejected going to hugging face
// yaha par emeddings ban ke aa raha hai har ek product desc ka aur phir similarity nikalne ka try chal raha hai
import { Matrix } from "ml-matrix";
// import fetch from "node-fetch";
import axios from "axios";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// async function query(data) {
//   const allembeddings = [];
//   // console.log("here is the data for api", data);
//   for (const product of data) {
//     const response = await fetch(
//       "https://api-inference.huggingface.co/models/guidecare/all-mpnet-base-v2-feature-extraction",
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.HF_URI}`,
//         },
//         method: "POST",
//         body: JSON.stringify(product.text),
//       }
//     );
//     const embedding1 = await response.json();
//     allembeddings.push({ id: product.id, embedding: embedding1 });
//   }
//   return allembeddings;
// }

async function query(data) {
  const allembeddings = [];

  for (const product of data) {
    try {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/guidecare/all-mpnet-base-v2-feature-extraction",
        { inputs: product.text },
        {
          headers: {
            Authorization: `Bearer ${process.env.HF_URI}`,
            "Content-Type": "application/json",
          },
        }
      );

      const embedding = response.data;
      allembeddings.push({ id: product.id, embedding: embedding });
    } catch (error) {
      if (error.response) {
        console.error(`Error fetching embedding for product ${product.id}:`);
      } else if (error.request) {
        console.error(
          `Error fetching embedding for product ${product.id}: No response received`
        );
      } else {
        console.error(
          `Error fetching embedding for product ${product.id}: ${error.message}`
        );
      }
    }
  }
  return allembeddings;
}

function cosineSimilarity(embedding1, embedding2) {
  if (!embedding1 || !embedding2) {
    console.log("One or both embeddings are undefined");
    return;
  }
  const vector1 = Matrix.rowVector(embedding1);
  const vector2 = Matrix.rowVector(embedding2);
  const dotProduct = vector1.mmul(vector2.transpose());

  const magnitude1 = vector1.norm();

  const magnitude2 = vector2.norm();

  if (!magnitude1 || !magnitude2) {
    console.log("One or both magnitudes are zero");
    return;
  }
  const similarity = dotProduct.div(magnitude1, magnitude2);
  if (!similarity) {
    console.log("Similarity calculation failed");
    return;
  }
  return similarity.get(0, 0); // Extract the similarity value from the Matrix
}

const getContactlens = asyncHandler(async () => {
  const data = await Product.find({ category: "Contactlens" });
  const products = data.map((item) => ({
    id: item._id,
    text: `(${item.brand}). ${item.description} `,
  }));
  return products;
});
const saveSimilarityAll = asyncHandler(async (similarityResults) => {
  try {
    for (const entry of similarityResults) {
      const { id, similarIds } = entry;
      const producti = await Product.findById(id);
      if (producti) {
        producti.similarIds = similarIds;
        await producti.save();
      } else {
        return { status: 404, error: "Product not found" };
      }
    }

    return {
      status: 200,
      message: "Similarity indexes For ContactLenses updated successfully!",
    };
  } catch (error) {
    return {
      status: 500,
      error:
        "Error updating similarity indexes for Contactlens: " + error.message,
    };
  }
});

const similarityIndexContactlens = async () => {
  try {
    // getting all the products from the database
    const queryData = await getContactlens();
    // with huggingface -> getting the embeddings for each of product's description with their respective ids,
    const allembeddings = await query(queryData);
    console.log(
      "here are the number of embeddings for contact",
      allembeddings.length
    );

    // calculating aggregrated embeddings
    // const aggregateEmbeddings = allembeddings.reduce(
    //   (accumulator, product) => accumulator.concat(product.embedding),
    //   []
    // );

    const similarityResults = [];

    for (let i = 0; i < allembeddings.length; i++) {
      const currentEmbedding = allembeddings[i].embedding;
      const similarityList = [];

      for (let j = 0; j < allembeddings.length; j++) {
        if (i !== j) {
          const comparisonEmbedding = allembeddings[j].embedding;
          const similarity = cosineSimilarity(
            currentEmbedding,
            comparisonEmbedding
          );
          similarityList.push({
            id: allembeddings[j].id,
            similarityIndex: similarity,
          });
        }
      }

      // Sort the similarity list in descending order based on the similarity index, and select the top 3 most similar descriptions
      const topSimilarities = similarityList
        .sort((a, b) => b.similarityIndex - a.similarityIndex)
        .slice(0, 3);

      similarityResults.push({
        id: allembeddings[i].id,
        similarIds: topSimilarities.map((item) => item.id),
      });
    }
    // console.log(similarityResults);

    // Now comes saving the similarity data of each product to the database
    const { status, message, error } = await saveSimilarityAll(
      similarityResults
    );
    if (error) {
      return { status, error };
    } else {
      return { status, message };
    }
  } catch (error) {
    return {
      status: 500,
      error:
        "Error updating similarity indexes for Contactlens: " + error.message,
    };
  }
};

export default similarityIndexContactlens;
